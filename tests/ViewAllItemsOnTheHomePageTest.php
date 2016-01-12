<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ViewAllItemsOnTheHomePage extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testViewAllItemsOnTheHomePage()
    {
        $item = factory(App\Item::class)->create(['description' => 'Item description']);

        $this->visit('/')
             ->see('Item description');
    }
}
