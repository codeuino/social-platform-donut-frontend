const Portfolio = require('../schema/portfolio')
const Org = require('../schema/organisation.js')
module.exports = {
    getPortfolio : async (req,res) => {
            const org = await Org.findById(req.body.id).populate('Portfolio')
            if (org) {
                if (org.portfolio.isEmpty()) {
                    // If portfolio doesn't exist
                    if(req.user) {
                        if(req.user.id === req.body.id) {
                            // Send Signal to display portfolio form
                            res.status(204).json({
                                msg:'Redirect to portfolio started form'
                            })
                        }else {
                            // user is different person
                            res.status(404).json({
                                msg:'Not found'
                            })
                        }
                    }else {
                        // user isn't looked in
                        res.status(404).json({
                            msg:'Not found'
                        })
                    }
                }else {
                    // Portfolio exist
                    res.status(200).json({
                        portfolio:org.Portfolio
                    })
                }
            }else {
                res.status(400).json({
                    msg:"User doesn't exist"
                })
            }
    },
    addPortfolio : async (req,res) => {
        if (req.user.type ===1 ) {
            try {
                const p = await Portfolio.create(req.body.portfolio)
                const org = await Org.findByIdAndUpdate(req.body.id,{
                    $set:{
                        'portfolio': p._id
                    }
                })
                res.status(200).json({
                    msg:'Portfolio Added'
                })
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    msg:'Failed to add portfolio, please try later'
                })
            }
        }else {
            res.status(401).json({
                msg:'Only organisation can have portfolio'
            })
        }
    },
    updatePortfolio : async (req,res) => {
        if(req.user.type === 1) {
            try {
                const user = await Org.findById(req.user.id)
                Portfolio.deleteOne({_id:user.portfolio})
                .then((err,docs)=> {
                    if(err) return res.status(500).json({msg:'Failed to update portfolio'})
                })
                .then(() => {
                    const p = await Portfolio.create(req.body.portfolio)
                    const org = await Org.findByIdAndUpdate(req.body.id,{
                    $set:{
                        'portfolio': p._id
                    }
                })
                res.status(200).json({
                    msg:'Portfolio Added'
                })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        msg:'Failed to update portfolio'
                    })
                })
            } catch (error) {
                res.status(400).json({
                    msg:'Failed to update portfolio'
                })
            }
        }else {
            res.status(401).json({
                msg:'Only organisation can have portfolio'
            })
        }
    }
}