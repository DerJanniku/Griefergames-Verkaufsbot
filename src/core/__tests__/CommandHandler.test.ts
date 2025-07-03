import { CommandHandler } from '../CommandHandler';
import { Bot } from 'mineflayer';

jest.mock('mineflayer', () => ({
  createBot: jest.fn(() => ({
    on: jest.fn(),
    chat: jest.fn(),
    username: 'TestBot',
  })),
}));

describe('CommandHandler', () => {
  let commandHandler: CommandHandler;
  let bot: Bot;

  beforeEach(() => {
    bot = require('mineflayer').createBot();
    commandHandler = new CommandHandler(bot);
  });

  it('sollte korrekt initialisiert werden', () => {
    expect(commandHandler).toBeInstanceOf(CommandHandler);
  });
});
