function addcategory(req,res)
{
    res.json({
        'status':200,
        'success':false,
        'msg':'Category inserted',
        'data':req.body
    })
}

module.exports = {
    addcategory
}