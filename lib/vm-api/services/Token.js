'use strict';

var config = require('../../../config');
var userModel = require('../models/User');
var tokenModel = require('../models/Token');

var md5 = require('MD5');
var Promise = require('bluebird');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config.mail);

var isTest = (process.env.NODE_ENV == 'test') ? true : false;
var mockTokenModel = require('../../../test/mock/token');

var Token = {
  createToken: function (username, email) {
    var token = {
      value: md5(Math.random()),
      username: username
    }
    var href = 'http://localhost/#/profile/' + token.value;
    var mailOptions = {
      from: 'Voice-memos <no-reply@voice-memos.com>',
      to: email,
      subject: 'Password Reset',
      text: 'Reset link :  ' + href,
      html: '<b>Click the link below to reset your password</b><br><a href="' + href + '">' + href + '</a>' // html body
    };
    if (isTest) {
      mockTokenModel.sendMail(mailOptions).then(function (result) {
        return result;
      });
    } else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }          
      });
    }
    
    return tokenModel.add(token).then(function (result) {
      return result;
    });
        
  },
  checkToken: function (username, token) {
    return tokenModel.get(username).then(function (result) {
      if (result) {
        var found = false;
        for (var i in result) {
          if (result[i].value == token) {
            found = true;
            break;
          }
        }
        return found;
      } else {
        return result;
      }
      
    });
  }
}

module.exports = Token;