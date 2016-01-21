<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CommentTest extends TestCase
{
	use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_a_user_can_submit_a_comment_to_an_item()
    {
    	$user = factory(App\User::class)->create(['name' => 'Mark']);

    	$this->actingAs($user);
    	
    	$item = factory(App\Item::class)->create(['description'	=> 'Item Description']);
    	$comment = factory(App\Comment::class)->create(['user_id' => $user->id, 'message' => 'My comment']);

    	$item->comments()->save($comment);

    	$this->seeInDatabase('comments', ['item_id' => $item->id, 'user_id' => $user->id, 'message' => 'My comment']);
    }
}
