import http from 'http'
import express from 'express'
import os from 'os'
import cluster from 'cluster';

const app = express();
let workers = []


function generateWorkers(workerCount) {
    for(let i = 0; i < workerCount; i ++) {
        workers.push(cluster.fork())
    }
}

function setupWorkerProcesses() {
    const coreCount = os.cpus().length
    console.log(`setting up cluster with ${coreCount} nodes`);

    generateWorkers()
    
}



export { app }