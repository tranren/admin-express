const admin = require('../dao/adminDao');

module.exports = (app) => {
    const apiPath = '/jarvis/' + app.version + '/admins';
    app.get(apiPath, (req, res, next) => {
        const pageIndex = req.query.pageIndex;
        const pageSize = req.query.pageSize;
        admin.findAndCount(pageIndex, pageSize)
            .then((result) => {
                res.send(result)
            }, (err) => {
                res.send(err);
            })
    });
    app.get(apiPath + '/:id', (req, res, next) => {
        admin.findById(req.params.id)
            .then((result) => {
                res.send(result)
            }, (err) => {
                res.send(err);
            })
    });
    app.post(apiPath, (req, res, next) => {
        admin.create({
            adminName: req.body.adminName || req.query.adminName,
            adminPassword: req.body.adminPassword || req.query.adminPassword,
            roleId: req.body.roleId || req.query.roleId
        }).then((result) => {
            res.send(result);
        }, (err) => {
            res.send(err);
        })
    });
    /**
     * remove records
     */
    app.delete(apiPath + '/:id', (req, res, next) => {
        admin.remove({
            adminId: req.params.id
        }).then((result) => {
            res.send(result);
        }, (err) => {
            res.send(err);
        })
    });
    /**
     * update records
     */
    app.put(apiPath + '/:id', (req, res, next) => {
        admin.update({
            adminId: req.params.id
        }, {
            adminName: req.body.adminName || req.query.adminName,
            adminPassword: req.body.adminPassword || req.query.adminPassword,
            roleId: req.body.roleId || req.query.roleId
        }).then((result) => {
            res.send(result);
        }, (err) => {
            res.send(err);
        })
    })
}