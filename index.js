#!/usr/bin/env node

'use strict'
const   execa = require('execa'),
        Listr = require('listr')

new Listr([
    {
        title: 'Removing package-lock',
        task: (ctx, task) => execa('rm', ['package-lock.json'])
            .catch(() => task.skip())
    },
    {
        title: 'Running npm install',
        task: () => execa('npm', ['install'])
    },
    {
        title: 'Adding package-lock to git',
        task: (ctx, task) =>
            execa('git', ['add', 'package-lock.json'])
                .catch(() => task.skip())
    }
]).run()
