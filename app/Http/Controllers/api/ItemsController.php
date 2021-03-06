<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use App\Events\UserLikedAnItem;
use App\Events\UserPostedAComment;
use App\Events\UserUnlikedAnItem;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Item;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function all()
    {
        return Item::all();
    }
  
    public function totalLikesCount($id)
    {
        $item = Item::findOrFail($id);

        return $item->likes_count;
    }    

    public function like($item, $userId)
    {
        $item = Item::findOrFail($item);
 
        if( $item->like($userId) )
        {
            event( new UserLikedAnItem($item) );
            return 'You liked an item.';
        }

        return 'There was an error liking a post.';
    }

    public function unlike($item, $userId)
    {
        $item = Item::findOrFail($item);

        if( $item->unlike($userId) )
        {
            event( new UserUnlikedAnItem($item) );
            return 'You unliked an item.';
        }
        return 'There was a problem unliking a post.';
    }

    public function comments($item)
    {
        $item = Item::with('comments.user')->findOrFail($item);

        return $item;

    }

    public function storeComment($itemId, Request $request)
    {
        $item = Item::with('comments.user')->findOrFail($itemId);

        $comment = new Comment([
            'user_id'   => $request->userId,
            'message'   => $request->message
            ]);

        $newComment = $item->comments()->save($comment);

        $result = Comment::with('user')->findOrFail($newComment->id);

        event( new UserPostedAComment($result) );
        
        return $result;
        
    }
}
