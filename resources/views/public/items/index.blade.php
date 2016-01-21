@extends('layouts.public')

@section('content')
	<div class="row">
		@if( Auth::user() )
			<h4>Hi {{ Auth::user()->name }}</h4>
		@endif

		<div id="Items"></div>

	</div>	
@endsection	

@section('footer_scripts')
	<script src="/js/Items.js"></script>
@endsection