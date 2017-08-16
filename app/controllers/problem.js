'use strict';
var models = require('../models');


module.exports = {
    createProblem(req,res) {
        models.problemstmt.create({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            subcategory: req.body.subcategory
        }).then(function (problem) {
            res.status(200).json({message:"Problem created successfully"});
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },

    getAllProblems(req,res){
        models.problemstmt.findAll({
            where:{category: req.query.category}
        })
            .then(function (problems) {
                res.status(200).json(problems);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    },

    getSubCatList(req,res){
        console.log("cat be>>",req.body.category)
        models.category.findAll({
            where:{category:req.body.category}
        })
            .then(function (subcats) {
                res.status(200).json(subcats);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    },

    getsubcategorieslist(req,res){
        console.log("cat be>>",req.body.category)
        models.category.findAll({
            where:{category:req.body.category}
        })
            .then(function (subcategories) {
                res.status(200).json(subcategories);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    },

    getProbList(req,res){
        console.log("cat be>>",req.body.category,req.body.subcategory)
        models.problemstmt.findAll({
            where:{
                category:req.body.category,
                subcategory:req.body.subcategory
            }
        })
            .then(function (probs) {
                res.status(200).json(probs);
            }).catch(function (error) {
            res.status(500).json(error);
        });
    }


}