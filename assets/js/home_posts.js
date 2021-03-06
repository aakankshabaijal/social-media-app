{
	// method to submit the form data for new post using AJAX
	let createPost = function() {
		let newPostForm = $('#new-post-form');
		newPostForm.submit(function(e) {
			e.preventDefault();
			$.ajax({
				type    : 'post',
				url     : '/posts/create',
				data    : newPostForm.serialize(),
				success : function(data) {
					let newPost = newPostDom(data.data.post);
					$('#posts-list-container>ul').prepend(newPost);
					$('#new-post-textarea').val('');
					deletePost($(' .delete-post-button', newPost));
					new ToggleLike($(' .like-button', newPost));
					// call the create comment class
					new PostComments(data.data.post._id);

					new Noty({
						theme   : 'relax',
						text    : 'Post published!',
						type    : 'success',
						layout  : 'topRight',
						timeout : 1500
					}).show();
				},
				error   : function(error) {
					console.log(error.responseText);
				}
			});
		});
	};

	// method to create a post in DOM
	let newPostDom = function(post) {
		if (post.user.avatar) {
			return $(`<li id="post-${post._id}">
					<section class="post-header">
					<img src=${post.user.avatar} alt=post.user.name />
					<h5 style="display: inline;"> ${post.user.name}</h5>
					<a href="/posts/destroy/<%= post.id %>" class="delete-post-button"><i class="fas fa-trash-alt"></i></a>
					</section>
					 <div class="post-content">${post.content}</div>
						<a href="/likes/toggle/?id=${post._id}&type=Post" class="like-button" data-likes="0"><i class="far fa-heart"></i> 0 </a>
						<i class="far fa-comment-dots"></i> ${post.comments.length}
						  <hr>
						  <div class="post-comments">
		                    <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
		                        <div class="row">
									<div class="col-md-10">
		 								<textarea name="content" cols="30" rows="2" placeholder="Type Your Comment Here..." required class="new-comment-textarea btn"></textarea>
		  								<input type="hidden" name="post" value=${post._id}>
									</div>
									<div class="col-md-1">
		  								<input type="submit" class="btn btn-outline-light" value="Comment">
									</div>
								</div>
		                    </form>
		                    <div class="post-comments-list">
		                    <ul id="post-comments-${post._id}">
		                    </ul>
		                	</div>
		            </div>
		        </li>`);
		}
		else {
			return $(`<li id="post-${post._id}">
					<section class="post-header">
					<i class="fas fa-user"></i>
					<h5 style="display: inline;"> ${post.user.name}</h5>
					<a href="/posts/destroy/<%= post.id %>" class="delete-post-button"><i class="fas fa-trash-alt"></i></a>
					</section>
					 <div class="post-content">${post.content}</div>
						<a href="/likes/toggle/?id=${post._id}&type=Post" class="like-button" data-likes="0"> <i class="far fa-heart"></i> 0</a>
						<i class="far fa-comment-dots"></i> ${post.comments.length}
						  <hr>
						 <div class="post-comments">
		                    <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
		                        <div class="row">
									<div class="col-md-10">
		 								<textarea name="content" cols="30" rows="2" placeholder="Type Your Comment Here..." required class="new-comment-textarea btn"></textarea>
		  								<input type="hidden" name="post" value=${post._id}>
									</div>
									<div class="col-md-1">
		  								<input type="submit" class="btn btn-outline-light" value="Comment">
									</div>
								</div>
		                    </form>
		                    <div class="post-comments-list">
		                    <ul id="post-comments-${post._id}">
		                    </ul>
		                	</div>
		            </div>
		        </li>`);
		}
	};

	// method to delete a post from DOM
	let deletePost = function(deleteLink) {
		$(deleteLink).click(function(e) {
			e.preventDefault();

			$.ajax({
				type    : 'get',
				url     : $(deleteLink).prop('href'),
				success : function(data) {
					$(`#post-${data.data.post_id}`).remove();
					new Noty({
						theme   : 'relax',
						text    : 'Post and associated comments deleted!',
						type    : 'success',
						layout  : 'topRight',
						timeout : 1500
					}).show();
				},
				error   : function(error) {
					console.log(error.responseText);
				}
			});
		});
	};

	/**
	 * loop over all the existing posts on the page (when the window loads for the first time)
	 * and call the delete post method on delete link of each
	 * also add AJAX (using the class we've created) to the delete button of each
	 */
	let convertPostsToAjax = function() {
		$('#posts-list-container>ul>li').each(function() {
			let self = $(this);
			let deleteButton = $(' .delete-post-button', self);
			deletePost(deleteButton);

			// get the post's id by splitting the id attribute
			let postId = self.prop('id').split('-')[1];
			new PostComments(postId);
			//this adds the ToggleLike class to each like button in this post,
			//as well as to all like buttons in the post's comments
			new ToggleLike($(' .like-button', self));
		});
	};

	createPost();
	convertPostsToAjax();
}
