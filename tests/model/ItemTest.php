<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ItemTest extends TestCase
{
	use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_a_user_can_view_an_item()
    {
    	$item = factory(App\Item::class)->create(['description' => 'Item Description']);

    	$this->visit('/items/1')
    		->see('Item Description');
    }
}
