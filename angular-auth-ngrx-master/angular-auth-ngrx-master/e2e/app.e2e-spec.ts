import { AppPage } from './app.po';

describe('angular-auth-ngrx App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular + NGRX');
  });
});
