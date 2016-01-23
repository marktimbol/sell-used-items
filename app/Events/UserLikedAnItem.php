<?php

namespace App\Events;

use App\Events\Event;
use App\Item;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class UserLikedAnItem extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $item;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Item $item)
    {
        $this->item = $item;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['user-liked-an-item-' . $this->item->id];
    }
}