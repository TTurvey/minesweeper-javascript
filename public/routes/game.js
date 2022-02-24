var router = require('express').Router();
const path = require('path');

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
});

router.get('/settings', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'views', 'game_settings.html'));
});

module.exports = router;