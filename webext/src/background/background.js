import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import uuidv4 from 'uuid/v4'
import api from '../utils/api.js'

const setBadge = async (text) => {
  await browser.browserAction.setBadgeText({ text })
}

browser.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed')

  let extractEndpoint
  const { installType } = await browser.management.getSelf()
  switch (installType) {
    case 'admin':
    case 'normal':
      extractEndpoint = `${api}/extract`
      break
    case 'development':
      extractEndpoint = 'http://localhost:3000/api/v1/extract'
      await setBadge('DEV')
      break
  }

  await browser.storage.sync.set({
    enabled: true,
    speed: 300,
    clientId: uuidv4(), // generate new id for each installation
    extractEndpoint
  })
  console.log('Initial storage synced')
})

browser.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  switch (command) {
    case 'activate-sutra':
      chrome.tabs.executeScript({
        file: 'injected-content.js'
      });
      break
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { payload, type } = request

})
