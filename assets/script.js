
// get request to database //

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();

client.get('/gettheposts', function (response) {
    var results = JSON.parse(response);
    var posts = results.length;
    document.getElementById('total').innerHTML = 'Total Posts: ' + posts;
    console.log(results);
    // loop thru array of blogs from data base //
    results.map(res => {
    //creating tags so we can add our values from db //
        var ptag = document.createElement('P');
        ptag.setAttribute("class", "post-content");
        var ptag2 = document.createElement('P');
        ptag2.setAttribute("class", "date-created");
        var hr = document.createElement('hr');
        var node = document.createTextNode(res.my_blogs);
        var node2 = document.createTextNode(res.date_created);
        ptag.appendChild(node);
        ptag2.appendChild(node2);
        var div2 = document.createElement('div');
        var div = document.getElementById('get-posts');
        div2.appendChild(ptag);
        div2.appendChild(ptag2);
        div2.appendChild(hr);
        div.prepend(div2);

    })
});

// post a blog //
