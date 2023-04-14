function addcategory(req,res)
{
    res.json({
        'status':200,
        'success':true,
        'msg':'Category inserted',
        'data':req.body
    })
}

module.exports = {
    addcategory
}