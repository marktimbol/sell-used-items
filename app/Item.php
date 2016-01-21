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

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function like($userId)
    {
    	$like = new Like(['user_id' => $userId]);

    	return $this->likes()->save($like);
    }

    public function unlike($userId)
    {
    	return $this->likes()->where('user_id', $userId)->delete();
    }

    public function isLiked($userId)
    {
    	return !! $this->likes()->where('user_id', $userId)->count();
    }

    public function getLikesCountAttribute()
    {
    	return $this->likes()->count();
    }
}
