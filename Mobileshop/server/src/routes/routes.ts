import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Mobile } from '../model/Mobile';
import { Cart } from '../model/Cart';
import { Review } from '../model/Review';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });


    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({email: email, password: password, name: name, address: address, nickname: nickname});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    //Mobile
    router.get('/getMobiles', (req: Request, res: Response) => {
            const query = Mobile.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
    });
    //create
    router.post('/mobiles', (req: Request, res: Response) => {
        console.log('1.');
        if (req.isAuthenticated()) {
            console.log('2.');
            if (req.isAuthenticated()) {
                isAdmin(req.user)
                    .then(isAdmin => {
                        if (isAdmin) {
                            console.log('3.');
                            const brand = req.body.brand;
                            const modelName = req.body.modelName;
                            const price = req.body.price;
                            const inStock = req.body.inStock;
                            const mobile = new Mobile({brand: brand, modelName: modelName, price: price, inStock: inStock});
                            mobile.save().then(data => {
                                res.status(200).send(data);
                            }).catch(error => {
                                res.status(500).send(error);
                            }) 
                        } else {
                            console.log('User is not an admin.');
                            res.status(403).send('User is not an admin');
                        }
                    })
                    .catch(error => {
                        console.error('Error checking admin status:', error);
                        res.status(500).send('Error checking admin status');
                    });

            } else {
                res.status(500).send('Mobile is not logged in.');
            }
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    // Update a mobile device
    /*router.put('/mobiles/:id', async (req: Request, res: Response) => {
        try {
            const updatedMobile = await Mobile.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedMobile) {
                res.status(200).json(updatedMobile);
            } else {
                res.status(404).send('Mobile not found');
            }
        } catch (error) {
            res.status(500).send('Internal server error.');
        }
    });*/

    // Delete a mobile device
    router.delete('/deleteMobile', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            isAdmin(req.user)
                .then(isAdmin => {
                    if (isAdmin) {
                        const id = req.query.id;
                        const query = Mobile.deleteOne({_id: id});
                        query.then(data => {
                            res.status(200).send(data);
                        }).catch(error => {
                            console.log(error);
                            res.status(500).send('Internal server error.');
                        })
                    } else {
                        console.log('User is not an admin.');
                        res.status(403).send('User is not an admin');
                    }
                })
                .catch(error => {
                    console.error('Error checking admin status:', error);
                    res.status(500).send('Error checking admin status');
                });

        } else {
            res.status(500).send('Mobile is not logged in.');
        }
    });

    async function isAdmin(user: any) {
        try {
            const foundUser = await User.findById(user);
    
            if (!foundUser) {
                console.log('User not found.');
                return false;
            }
    
            return foundUser.email === "admin@gg";
        } catch (error) {
            console.error('Error querying the database:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    }

    //Cart
    router.get('/getCart', (req: Request, res: Response) => {
        const query = Cart.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.post('/cart', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const price = req.body.price;
            const quantity = req.body.quantity;
            const cart = new Cart({name: name, price: price, quantity: quantity});
            cart.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            }) 
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/emptyCart', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            Cart.deleteMany({})
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Internal server error.');
                });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.put('/buyCart', (req, res) => {
        const modelName = req.query.modelName;
        // Find the mobile by modelName and update the inStock value
        Mobile.findOneAndUpdate({ modelName: modelName }, { $inc: { inStock: -1 } }, { new: true })
            .then(updatedMobile => {
                if (!updatedMobile) {
                    return res.status(404).json({ error: 'Mobile not found' });
                }
                res.status(200).json(updatedMobile);
            })
            .catch(error => {
                console.error('Error updating mobile:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    });

    //Review
    router.get('/getAllReviews', (req: Request, res: Response) => {
        const query = Review.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.post('/review', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const currentDate = new Date();
            
            const reviewS = req.body.review;
            const modelName = req.body.modelName;
            const name = req.body.name;
            const date = currentDate.getTime();
            const review = new Review({review: reviewS, modelName: modelName, name: name, date: date});
            review.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            }) 
        } else {
            res.status(500).send('User is not logged in.');
        }
    });




    return router;
}