import { AnimationTestsPage } from './app.po';

describe('animation-tests App', () => {
  let page: AnimationTestsPage;

  beforeEach(() => {
    page = new AnimationTestsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
