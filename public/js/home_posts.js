{
	//method to submit the form data for new post using AJAX
	let createPost = () => {
		let newPostForm = $('#new-post-form');
		newPostForm.submit((e) => {
			e.preventDefault();
			$.ajax({
				type    : 'POST',
				url     : '/posts/create',
				data    : newPostForm.serialize(), //convert the form data into JSON
				success : (data) => {
					let newPost = newPostDom(data.data.post);
					$('#posts-list-container>ul').prepend(newPost);
					deletePost($(' .delete-post-button', newPost));
					console.log(data);
				},
				error   : (err) => {
					console.log(err.responseText);
				}
			});
		});
	};

	//method to create a post in DOM
	let newPostDom = (post) => {
		return $(`<li id="post-${post._id}">
    <>
        <small>
            <a class="delete-post-btn" href="/posts/destroy/${post._id}"> Delete </a>
        </small>
        ${post.content}
        <br>
        <small> ${post.user.name} </small>
    </p>
    <div class="post-comments">
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Add a comment..." required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add Comment">
        </form>

        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
    </div>
    `);
	};

	//method to delete a post using AJAX
	let deletePost = (deleteLink) => {
		$(deleteLink).click((e) => {
			e.preventDefault();
			$.ajax({
				type    : 'GET',
				url     : $(deleteLink).prop('href'),
				success : (data) => {
					$(`#post-${data.data.post.id}`).remove();
					console.log(data);
				},
				error   : (err) => {
					console.log(err.responseText);
				}
			});
		});
	};

	createPost();
}
