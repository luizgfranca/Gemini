import http from 'http'
import express from 'express'
import os from 'os'

const app = express();
let workers = {}


function generateWorkers(workerCount) {
    
}

function setupWorkerProcesses() {
    const coreCount = os.cpus().length
    console.log(`setting up cluster with ${coreCount} nodes`);



}



export { app }