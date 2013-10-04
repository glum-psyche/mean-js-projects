(function() {
  var Article, async, mongoose, _;

  mongoose = require('mongoose');

  async = require('async');

  Article = mongoose.model('Article');

  _ = require('underscore');

  exports.article = function(req, res, next, id) {
    return Article.load(id, function(err, article) {
      if (err) {
        return next(err);
      }
      if (!article) {
        return next(new Error('Failed to load article ' + id));
      }
      req.article = article;
      next();
      return false;
    });
  };

  exports.create = function(req, res) {
    var article;
    article = new Article(req.body);
    article.user = req.user;
    return article.save(function(err) {
      if (err) {
        return res.send('users/signup', {
          errors: err.errors,
          article: article
        });
      } else {
        res.jsonp(article);
      }
      return false;
    });
  };

  exports.update = function(req, res) {
    var article;
    article = req.article;
    article = _.extend(article, req.body);
    return article.save(function(err) {
      return res.jsonp(article);
    });
  };

  exports.destroy = function(req, res) {
    var article;
    article = req.article;
    return article.remove(function(err) {
      if (err) {
        return res.render('error', {
          status: 500
        });
      } else {
        return res.jsonp(article);
      }
    });
  };

  exports.show = function(req, res) {
    return res.jsonp(req.article);
  };

  exports.all = function(req, res) {
    return Article.find().sort('-created').populate('user').exec(function(err, articles) {
      if (err) {
        return res.render('error', {
          status: 500
        });
      } else {
        return res.jsonp(articles);
      }
    });
  };

}).call(this);
