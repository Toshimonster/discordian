'use babel';

import DiscordianView from './discordian-view';
import { CompositeDisposable } from 'atom';

export default {

  discordianView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.discordianView = new DiscordianView(state.discordianViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.discordianView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'discordian:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.discordianView.destroy();
  },

  serialize() {
    return {
      discordianViewState: this.discordianView.serialize()
    };
  },

  toggle() {
    console.log('Discordian was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
