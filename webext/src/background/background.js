import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import uuidv4 from 'uuid/v4'
import api from '../utils/api.js'

const setBadge = async (text) => {
  await browser.browserAction.setBadgeText({ text })
}

const activateSutra = async (inNewTab, selectedText) => {
  console.log('activating sutra')

  try {
    if (typeof selectedText === 'string') {
      await browser.storage.sync.set({ selectedText })
    }

    if (inNewTab) {
      await browser.tabs.create({url: chrome.extension.getURL('sutra.html')})
    } else {
      chrome.tabs.executeScript({
        file: 'injected-content.js'
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}

browser.runtime.onSuspend.addListener(async () => {
  await browser.storage.sync.set({ selectedText: null })
})

browser.runtime.onInstalled.addListener(async () => {
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

  browser.contextMenus.create({
    id: "sutra_activate",
    title: "Activate Sutra",
    contexts: ["selection", "page"]
  });

  await browser.storage.sync.set({
    enabled: true,
    speed: 300,
    clientId: uuidv4(), // generate new id for each installation
    extractEndpoint
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  switch(info.menuItemId) {
    case 'sutra_activate':
      // info.srcUrl has the pdf url
      // info.selectionText has selected text
      activateSutra(true, info.selectionText)
      break
  }
})

browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'activate-sutra':
      activateSutra()
      break
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { payload, type } = request

})
