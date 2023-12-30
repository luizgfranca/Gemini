import http from 'http'
import express from 'express'
import os from 'os'
import cluster from 'cluster';
import node from 'node'

const app = express();
let workers = []


function logWorkerMessage(message) {
    console.log(`[worker-message] ${message}`)
}

function generateWorkers(workerCount) {
    for(let i = 0; i < workerCount; i ++) {
        workers.push(cluster.fork())
        console.log(`worker ${workers[i].process.pid} started`)
        workers[i].on('message', logWorkerMessage)
    }
}

function startNewWorker() {
    console.log('starting new worker')
    workers.push(cluster.fork())
    workers[workers.length - 1].on('message', logWorkerMessage)

}

function setupWorkerProcesses() {
    const coreCount = os.cpus().length
    console.log(`setting up cluster with ${coreCount} nodes`);

    generateWorkers(coreCount)

}

function setupServer() {
    if(cluster.isPrimary) setupWorkerProcesses()
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died with code ${code}\n${signal}`)
    startNewWorker()
})

setupServer()

export { app }