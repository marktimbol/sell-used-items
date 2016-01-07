@extends('layouts.public')

@section('content')

	<div class="row">

		@if( Auth::user() )
		
			<h4>Hi {{ Auth::user()->name }}</h4>
		
		@endif

		<div id="itemsList">

		</div>

	</div>	

@endsection	