const { expect } = require("chai");
const request = require("request");
const url = 'http://localhost:3000/api/cat';
let cat = { path: 'gfhfgh', title: 'Fghghghghfh' }; 

describe('GET API', function () {
    it('returns status code 200 for GET request', function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('returns valid JSON for GET request', function (done) {
        request(url, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(200);
            expect(responseObj.data).to.be.an('array');
            done();
        });
    });
});

describe('POST API', function () {
    it('posts a flower to the database', function (done) {
        request.post({ url: url, form: cat }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(201);
            expect(responseObj.data).to.be.an('object');
            done();
        });
    });

    it('fails to post with invalid data', function (done) {
        const invalidCat = { path: 'invalid' };
        request.post({ url: url, form: invalidCat }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(400);
            expect(responseObj.error).to.exist;
            done();
        });
    });

    it('fails to post with an existing image path', function (done) {
        // Assuming that the API returns a 409 status code for a conflict
        request.post({ url: url, form: cat }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(400); // Adjust based on your actual implementation
            expect(responseObj.error).to.exist;
            done();
        });
    });
});

describe('DELETE API', function () {
    let catId; 

    before(function (done) {
        // Create a cat for testing delete
        request.post({ url: url, form: cat }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            catId = responseObj.data._id;
            done();
        });
    });

    it('deletes a cat by ID', function (done) {

        const deleteUrl = `http://localhost:3000/api/cat/6580f0b2ca2742ece4895c23`;
        request.delete({ url: deleteUrl }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(200);
            expect(responseObj.message).to.equal('success');
            done();
        });
    });

    it('fails to delete with an invalid ID', function (done) {
        // const invalidId = 'invalidId';
        const deleteUrl = `http://localhost:3000/api/cat/1010`;
        request.delete({ url: deleteUrl }, function (error, response, body) {
            let responseObj = JSON.parse(body);
            expect(responseObj).to.be.an('object');
            expect(responseObj.statusCode).to.equal(404); 
            expect(responseObj.error).to.exist;
            done();
        });
    });

    
});
