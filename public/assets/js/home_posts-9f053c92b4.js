{let t=function(){let t=$("#new-post-form");t.submit((function(n){n.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let n=e(t.data.post);$("#posts-list-container>ul").prepend(n),$("#new-post-textarea").val(""),s($(" .delete-post-button",n)),new ToggleLike($(" .like-button",n)),new PostComments(t.data.post._id),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return t.user.avatar?$(`<li id="post-${t._id}">\n\t\t\t\t\t<section class="post-header">\n\t\t\t\t\t<img src=${t.user.avatar} alt=post.user.name />\n\t\t\t\t\t<h5 style="display: inline;"> ${t.user.name}</h5>\n\t\t\t\t\t<a href="/posts/destroy/<%= post.id %>" class="delete-post-button"><i class="fas fa-trash-alt"></i></a>\n\t\t\t\t\t</section>\n\t\t\t\t\t <div class="post-content">${t.content}</div>\n\t\t\t\t\t\t<a href="/likes/toggle/?id=${t._id}&type=Post" class="like-button" data-likes="0"><i class="far fa-heart"></i> 0 </a>\n\t\t\t\t\t\t<i class="far fa-comment-dots"></i> ${t.comments.length}\n\t\t\t\t\t\t  <hr>\n\t\t\t\t\t\t  <div class="post-comments">\n\t\t                    <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n\t\t                        <div class="row">\n\t\t\t\t\t\t\t\t\t<div class="col-md-10">\n\t\t \t\t\t\t\t\t\t\t<textarea name="content" cols="30" rows="2" placeholder="Type Your Comment Here..." required class="new-comment-textarea btn"></textarea>\n\t\t  \t\t\t\t\t\t\t\t<input type="hidden" name="post" value=${t._id}>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-md-1">\n\t\t  \t\t\t\t\t\t\t\t<input type="submit" class="btn btn-outline-light" value="Comment">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t                    </form>\n\t\t                    <div class="post-comments-list">\n\t\t                    <ul id="post-comments-${t._id}">\n\t\t                    </ul>\n\t\t                \t</div>\n\t\t            </div>\n\t\t        </li>`):$(`<li id="post-${t._id}">\n\t\t\t\t\t<section class="post-header">\n\t\t\t\t\t<i class="fas fa-user"></i>\n\t\t\t\t\t<h5 style="display: inline;"> ${t.user.name}</h5>\n\t\t\t\t\t<a href="/posts/destroy/<%= post.id %>" class="delete-post-button"><i class="fas fa-trash-alt"></i></a>\n\t\t\t\t\t</section>\n\t\t\t\t\t <div class="post-content">${t.content}</div>\n\t\t\t\t\t\t<a href="/likes/toggle/?id=${t._id}&type=Post" class="like-button" data-likes="0"> <i class="far fa-heart"></i> 0</a>\n\t\t\t\t\t\t<i class="far fa-comment-dots"></i> ${t.comments.length}\n\t\t\t\t\t\t  <hr>\n\t\t\t\t\t\t <div class="post-comments">\n\t\t                    <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n\t\t                        <div class="row">\n\t\t\t\t\t\t\t\t\t<div class="col-md-10">\n\t\t \t\t\t\t\t\t\t\t<textarea name="content" cols="30" rows="2" placeholder="Type Your Comment Here..." required class="new-comment-textarea btn"></textarea>\n\t\t  \t\t\t\t\t\t\t\t<input type="hidden" name="post" value=${t._id}>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-md-1">\n\t\t  \t\t\t\t\t\t\t\t<input type="submit" class="btn btn-outline-light" value="Comment">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t                    </form>\n\t\t                    <div class="post-comments-list">\n\t\t                    <ul id="post-comments-${t._id}">\n\t\t                    </ul>\n\t\t                \t</div>\n\t\t            </div>\n\t\t        </li>`)},s=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post and associated comments deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},n=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);s(e);let n=t.prop("id").split("-")[1];new PostComments(n),new ToggleLike($(" .like-button",t))}))};t(),n()}