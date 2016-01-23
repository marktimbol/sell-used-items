<?php

namespace App\Events;

use App\Item;
use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserUnlikedAnItem extends Event implements ShouldBroadcast
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
        return ['user-unliked-an-item-' . $this->item->id];
    }
}
