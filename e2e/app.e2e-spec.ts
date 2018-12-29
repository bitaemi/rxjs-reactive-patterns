import { ReactivePatternsCoursePage } from './app.po';

describe('reactive-patterns-course App', function() {
  let page: ReactivePatternsCoursePage;

  beforeEach(() => {
    page = new ReactivePatternsCoursePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
