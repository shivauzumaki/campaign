'use strict';
var models = require('../models');


module.exports = {
    createIdea(req,res) {
        console.log("req create idea>>>",JSON.stringify(req.body))
        var problems=req.body.problems;
        models.idea.create({
            userId: req.body.userId,
            problemId: "problemId",
            title: req.body.title,
            summary: req.body.summary,
            keyproblem: req.body.keyproblem,
            customers: req.body.customers,
            betteridea: req.body.betteridea,
            passionate: req.body.passionate,
            aboutteam: req.body.aboutteam,
            category: req.body.category,
            subcategory: req.body.subcategory
        }).then(function (idea) {
            var size = req.body.problems.length;
            var problems = req.body.problems;
            for(var i = 0; i < size;i++){
                models.userideaprobmap.create({
                    userId:req.body.userId,
                    ideaId:idea.id,
                    problemId:problems[i].id
                }).then(function () {
                    console.log("added")
                })
            }
            res.status(200).json({id:idea.id,message:"Idea created successfully"});
        }).catch(function (error) {
            console.log("error>>",error)
            res.status(500).json(error);
        });
    },
    getAllIdeas(req,res){
        models.idea.findAll({})
            .then(function (ideas) {
                res.status(200).json(ideas);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    },

    getUserIdeas(req,res){
        models.idea.findAll({where:{
            userId:req.body.id
        }})
            .then(function (ideas) {
                res.status(200).json(ideas);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    }
}