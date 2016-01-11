<?php

namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['price', 'description', 'path'];

    public function likes()
    {
    	return $this->morphMany(Like::class, 'likeable');
    }

    public function like()
    {
    	$like = new Like(['user_id' => Auth::id()]);

    	return $this->likes()->save($like);
    }

    public function unlike()
    {
    	return $this->likes()->where('user_id', Auth::id())->delete();
    }

    public function toggle()
    {
    	if( $this->isLiked() )
    	{
    		return $this->unlike();
    	}

    	return $this->like();
    }

    public function isLiked()
    {
    	return !! $this->likes()->where('user_id', Auth::id())->count();
    }

    public function getLikesCountAttribute()
    {
    	return $this->likes()->count();
    }
}
