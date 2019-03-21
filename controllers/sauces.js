const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req,res,next) => {
	const url = req.protocol + '://' + req.get('host');
	req.body.sauce = JSON.parse(req.body.sauce);
	const sauce = new Sauce ({
		  userId: req.body.sauce.userId,
		  name: req.body.sauce.name,
		  manufacturer: req.body.sauce.manufacturer,
		  description: req.body.sauce.description,
		  mainPepper: req.body.sauce.mainPepper,	  
		  imageUrl: url + '/images/' + req.file.filename,  
		  heat: req.body.sauce.heat,
		  likes:0,
		  dislikes:0,
		  usersLiked :[],
		  usersDisliked:[],
	});
	sauce.save().then(
		() => {
			res.status(201).json({
				message:'Sauce saved succesfully'
			})
		}
	).catch(
		(error) => {
			res.status(400).json({
				error:error
			});
		}
 	)
};

exports.getOneSauce = (req,res,next)=>{
	Sauce.findOne({
		_id: req.params.id
	}).then(
		(sauce) => {
			res.status(200).json(sauce);
		}
	).catch(
		(error) => {
			res.status(404).json({
				error: error
			});
		}
	);
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer:req.body.sauce.manufacturer,
      mainPepper:req.body.sauce.mainPepper,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      userId: req.body.sauce.userId
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer:req.body.manufacturer,
      mainPepper:req.body.mainPepper,
      description: req.body.description,
      heat: req.body.heat,
      userId: req.body.userId
    };
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req,res,next) => {
	if(req.body.like === 1) {
		Sauce.findOne({_id:req.params.id}).then(
			(sauce) => {
				if (sauce.usersLiked.includes(req.body.userId)){
					res.status(401).json({
						message : 'Invalid request'
					});
				} else {
					sauce.likes = sauce.likes + 1;
					sauce.usersLiked.push(req.body.userId);
					sauce.save().then(
						() => {
							res.status(201).json({
								message:'Sauce liked succesfully'
							})
						}
					).catch(
						(error) => {
							res.status(400).json({
								error:error
							});
						}
 					);
				}				
			}	
		)
	} else if (req.body.like === 0 ){
		Sauce.findOne({_id:req.params.id}).then(
			(sauce) => {
				if(sauce.usersLiked.includes(req.body.userId)){
					sauce.usersLiked = sauce.usersLiked.filter(e => e !== req.body.userId);
					sauce.likes = sauce.likes - 1;
					sauce.save().then(
							() => {
								res.status(201).json({
									message:'Sauce like canceled succesfully'
								})
							}
						).catch(
							(error) => {
								res.status(400).json({
									error:error
								});
							}
 						);
				} else {
					if(sauce.usersDisliked.includes(req.body.userId)){
						sauce.usersDisliked = sauce.usersDisliked.filter(e => e !== req.body.userId);
						sauce.dislikes = sauce.dislikes - 1
						sauce.save().then(
							() => {
								res.status(201).json({
									message:'Sauce dislike canceled succesfully'
								})
							}
						).catch(
							(error) => {
								res.status(400).json({
									error:error
								});
							}
 						);
					} else {
						res.status(400).json({
							message : 'Invalid request'
						});
					}
				}
			}
		);

	} else {
		Sauce.findOne({_id:req.params.id}).then(
			(sauce) =>{
				if( sauce.usersDisliked.includes(req.body.userId)){
					res.status(400).json({
						message : 'Invalid request'
					})
				} else {
					sauce.dislikes = sauce.dislikes + 1;
					sauce.usersDisliked.push(req.body.userId);
					sauce.save().then(
						() => {
							res.status(201).json({
								message:'Sauce disliked succesfully'
							})
						}
					).catch(
						(error) => {
							res.status(400).json({
								error:error
							});
						}
 					)
				}
			}
		);
	}
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Sauce deleted succesfully'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getSauces = (req,res,next) => {
	Sauce.find().then(
		(sauces) => {
			res.status(200).json(sauces);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error:error
			});
		}
	);
};