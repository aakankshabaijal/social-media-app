/**
 * Let's implement this via classes
 * this class would be initialized for every post on the page
 * 1. When the page loads
 *  2. Creation of every post dynamically via AJAX
 */

/**
 * Class properties : 
 * 		1. postId
 * 		2. postContainer
 * 		3. newCommentForm
 * Class methods :
 * 		1. createComment
 * 		2. newCommentDom
 * 		3. deleteComment
 */

class PostComments {
	// constructor is used to initialize the instance of the class whenever a new instance is created
	constructor(postId) {
		this.postId = postId;
		this.postContainer = $(`#post-${postId}`);
		this.newCommentForm = $(`#post-${postId}-comments-form`);

		this.createComment(postId);

		let self = this;
		// call for all the existing comments
		//the delete comment button in all comments in this post's container
		$(' .delete-comment-button', this.postContainer).each(function() {
			self.deleteComment($(this));
		});
	}

	//this is a reference to the object of PostComments class
	createComment(postId) {
		let pSelf = this; //refers to the Post
		this.newCommentForm.submit(function(e) {
			e.preventDefault();

			let self = this; //refers to the comment form
			$.ajax({
				type    : 'post',
				url     : '/comments/create',
				data    : $(self).serialize(), //converting form data to JSON
				success : function(data) {
					let newComment = pSelf.newCommentDom(data.data.comment);

					$(`#post-comments-${postId}`).prepend(newComment);
					$('.new-comment-textarea').val('');
					pSelf.deleteComment($(' .delete-comment-button', newComment));
					new ToggleLike($(' .like-button', newComment));

					new Noty({
						theme   : 'relax',
						text    : 'Comment published!',
						type    : 'success',
						layout  : 'topRight',
						timeout : 1500
					}).show();
				},
				error   : function(error) {
					console.log('ERROR', error);
					console.log(error.responseText);
				}
			});
		});
	}

	newCommentDom(comment) {
		// I've added a class 'delete-comment-button' to the delete comment link
		// and also id to the comment's li

		if (comment.user.avatar) {
			return $(`<li id="comment-${comment._id}">
					<section class="comment">
						<img src=${comment.user.avatar} alt=${comment.user.name}>
						<h6 style="display: inline;"> <b> ${comment.user.name}</b>   ${comment.content}</h6>
		               
						<a href="/likes/toggle/?id=${comment._id}&type=Comment" class="like-button" data-likes="0"><i class="far fa-heart"></i>  0</a>
		                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fas fa-trash-alt"></i></a>
					</section>
		        </li>`);
		}
		else {
			return $(`<li id="comment-${comment._id}">
					<section class="comment">
						<i class="fas fa-user"></i>
						<h6 style="display: inline;"> <b> ${comment.user.name}</b>  ${comment.content}</h6>
		               
						<a href="/likes/toggle/?id=${comment._id}&type=Comment" class="like-button" data-likes="0"><i class="far fa-heart"></i>  0</a>
		                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fas fa-trash-alt"></i></a>
					</section>
		        </li>`);
		}
	}

	deleteComment(deleteLink) {
		$(deleteLink).click(function(e) {
			e.preventDefault();
			$.ajax({
				type    : 'get',
				url     : $(deleteLink).prop('href'),
				success : function(data) {
					$(`#comment-${data.data.comment_id}`).remove();

					new Noty({
						theme   : 'relax',
						text    : 'Comment Deleted',
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
	}
}
