
// TODO: get all posts from  database //
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
        var blogBody = res.my_blogs;
        //creating tags so we can add our values from db //
        var ptag = document.createElement('div');
        ptag.setAttribute("class", "post-content");
        var ptag2 = document.createElement('P');
        ptag2.setAttribute("class", "date-created");
        var hr = document.createElement('hr');
        var node2 = document.createTextNode(res.date_created);
        ptag.innerHTML = blogBody;
        ptag2.appendChild(node2);
        var div2 = document.createElement('div');
        var div = document.getElementById('get-posts');
        div2.appendChild(ptag);
        div2.appendChild(ptag2);
        div2.appendChild(hr);
        div.prepend(div2);

    })
});



//TODO: Post function//
function sendPost() {
    // var recentPost = document.getElementById('editor1').value;
    // var recentPost = CKEDITOR.instances.editor1.document.getBody().getText();
    var recentPost = CKEDITOR.instances.editor1.getData();
    console.log('test' + recentPost);
    //check for validation//
    if (recentPost === '') {
        alert('Please write something')
    }
    //post request if validation is right//
    else {
        var blogPost = {
            data: recentPost
        };
        console.log(blogPost);

        fetch('/postblog', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        }).then(function (response) {
            return response.json();
        })
        alert('Post added!')
        window.location.reload();
    }
   
}