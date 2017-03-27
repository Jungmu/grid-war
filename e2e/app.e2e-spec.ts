import { GridWarPage } from './app.po';

describe('grid-war App', () => {
  let page: GridWarPage;

  beforeEach(() => {
    page = new GridWarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
