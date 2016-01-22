<?php

namespace App\Http\Controllers\Api;

use App\Comment;
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
            return 'You liked an item.';
        }

        return 'There was an error liking a post.';
    }

    public function unlike($item, $userId)
    {
        $item = Item::findOrFail($item);

        if( $item->unlike($userId) )
        {
            return 'You unliked an item.';
        }
        return 'There was a problem unliking a post.';
    }

    public function comments($item)
    {
        $item = Item::findOrFail($item);

        return $item->comments;

    }

    public function storeComment($itemId, Request $request)
    {
        $item = Item::findOrFail($itemId);

        $comment = new Comment([
            'user_id'   => $request->userId,
            'message'   => $request->message
            ]);

        $newComment = $item->comments()->save($comment);

        // $pusher = new Pusher(public, secret, appId);

        // $pusher->trigger('newCommentOnitem', UserPostedAComment::class, []);

        // return 'Done';
    }
}
