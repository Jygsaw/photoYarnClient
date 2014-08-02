define(function(require, exports, module) {
  // import dependencies
  'use strict';
  var Engine = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Surface = require('famous/core/Surface');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var GridLayout = require('famous/views/GridLayout');
  var mainContext = Engine.createContext();
  var RenderController = require('famous/views/RenderController');
  var View = require('famous/core/View');

  //custom views
  var NewYarnView = require('views/NewYarnView');
  var FeedView = require('views/FeedView');
  var YarnView = require('views/YarnView');

  //custom buttons
  var CustomButton = require('customControls/CustomButton');

  //Creating Layout
  var layout = new HeaderFooterLayout({
    headerSize: 75,
    footerSize: 50
  });

  //famo.us logo because famo.us is cool!
  var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://img3.wikia.nocookie.net/__cb20130220230859/farmville2/images/a/aa/Super-Fine_Yarn_Ball.png',
  });

  var renderController = new RenderController();

  //Layout Header
  layout.header.add(new Surface({
    content: 'Photo Yarn',
    classes: ['customButton','medgreenBG'],
    properties: {
      lineHeight: layout.options.headerSize + 'px',
      textAlign: 'center'
    }
  }));

  //Layout Content
  var centerModifier = new Modifier({
    origin: [0.5, 0.5],
  });

  layout.content.add(centerModifier).add(renderController);
  renderController.show(yarnView);

  var feedView = new FeedView({
    message: 'custom feed view'
  });

  var newYarnView = new NewYarnView({
    message: 'custom new yarn view'
  });

  var yarnView = new YarnView({
    message: 'custom yarn view'
  });

  //Layout Footer
  var buttons = [];

  // buttons.push(new CustomButton('Feed', layout, renderController, feedView, ['customButton','lightgreenBG']));
  buttons.push(new CustomButton({
    name: 'Feed',
    lineHeight: '50px',
    classes: ['customButton', 'lightgreenBG'],
    target: feedView,
    renderController: renderController
  }));

  buttons.push(new CustomButton({
    name: 'New Yarn',
    lineHeight: '50px',
    classes: ['customButton', 'lightgreenBG'],
    target: newYarnView,
    renderController: renderController
  }));

  buttons.push(new CustomButton({
    name: 'Yarn',
    lineHeight: '50px',
    classes: ['customButton', 'lightgreenBG'],
    target: yarnView,
    renderController: renderController
  }));
  // buttons.push(new CustomButton('New Yarn', layout, renderController, newYarnView, ['customButton','medgreenBG']));
  // buttons.push(new CustomButton('Yarn', layout, renderController, yarnView, ['customButton','lightgreenBG']));

  var grid = new GridLayout({
    dimensions: [3,1]
  });
  
  grid.sequenceFrom(buttons);

  layout.footer.add(grid);

  mainContext.add(layout);

  renderController.show(logo);
});
