import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import uuidv4 from 'uuid/v4'
import api from '../utils/api.js'

const setBadge = async (text) => {
  await browser.browserAction.setBadgeText({ text })
}

const activateSutra = (selection) => {
  console.log('activating sutra')
  const injectContent = () => {
    chrome.tabs.executeScript({
      file: 'injected-content.js'
    });
  }

  if (selection && typeof selection === 'string') {
    console.log(`calling inject content script with selection: ${selection}`)
    chrome.tabs.executeScript({
      code: `var sutraSelectedText = "${selection}";`
    }, injectContent)
  } else {
    injectContent()
  }
}

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

  chrome.contextMenus.onClicked.addListener((info) => {
    switch(info.menuItemId) {
      case 'sutra_activate':
        activateSutra(info.selectionText)
        break
    }
  })

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
