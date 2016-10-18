import CodeversationModel from 'server/db/model/Codeversation';

exports.create = function(req, res) {
  var cv = new CodeversationModel ({
    title: req.body.title,
    content: req.body.content,
    public: req.body.public
  });

  cv.save();

};

exports.getCodeversation = function (req, res) {
  res.render('newcodeversation', {title: 'codeversation - new codeversation'});
}
