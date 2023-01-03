const db = require("../config/db");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
//const { Prisma } = require("@prisma/client");


const UploadController = {
    upload: (req, res) => {
        try {
            let results = [];

            var r = fs.createReadStream(path.join(path.dirname(__dirname), "./upload/Opdrachten001.csv"))
                .pipe(csv('{headers: false}')) // skip first row
                .on("data", data => {
                    results.push(data);
                })
                .on("end", () => {

                    //res.status(202).json(results);
                    console.log("Finished parsing csv");
                    console.log("Total rows: " + results.length);
                    console.log("Inserting into database...");
                    let testSuite = "";
                    let a;
                    //forEach would be simular to map, but runs a function for each element anddiscards the result: side effects occur.
                    //await Promise.all(arr.map(async(o) //...wailts for all the function calls tofinish and discards the results; the iteratee functions are called in parallelhowever.
                    results.reduce(async (memo, o) => {
                        console.log(o);
                        
                        await memo;

                        try {
                            console.log('testSuite : ' + testSuite);
                            if (testSuite !== o.Opdracht) {
                                //the header names are used for the fields
                                console.log("Creating new assignment");
                                testSuite = o.Opdracht;
                                console.log(o.Opdracht);
                                //res.status(200).json(o.Opdracht);
                                const newAssignment = {
                                    naam: testSuite
                                };
                                a = await db.opdracht.create({
                                    data: newAssignment
                                });
                                console.log(a);
                            }
                            const newAssignmentElement = {
                                beschrijving: o.Beschrijving, minuten: o.Duurtijd, opdrachtId: a.id
                            };
                            let ae = await db.opdrachtElement.create({
                                data: newAssignmentElement
                            });
                            console.log(ae);
                        } catch (error) {
                            console.log(error);
                        }
                    }, "");
                    
                    res.status(200).json("OK");
                }
                );
        } catch (error) {
            res.status(500).send(error);
        }
    },
};


module.exports = UploadController;