@extends('layouts.public')

@section('content')
	<div class="row">
		<div id="ItemWithComments" class="Item">
			<div class="col s12 m6">
				<div class="card-panel">
					<div class="Item__user">
						<div class="row valign-wrapper">
							<div class="col s2">
								<img src="http://materializecss.com/images/yuna.jpg" alt="" class="circle responsive-img">
							</div>
							<div class="col s10">
								<h6 class="Item__user__name">Full Name</h6>
							</div>
						</div>
					</div>

					<div>
						<img src="{{ $item->path }}" alt="{{ $item->description }}" title="{{ $item->description }}" data-caption="{{ $item->description }}" class="materialboxed responsive-img" />
					</div>

					<div class="Item__counters">
						<p>4 Likes</p>
					</div>

					<div class="Item__actions">
						<p>
							<a class=""><i class="material-icons tiny">thumb_up</i> Like</a>	
						</p>
					</div>
				</div>
			</div>

			<div class="col s12 m6">
				<div class="Item__comments">
					<div class="card-panel">
						<h4 class="Item__comments__title">Comments</h4>

						@foreach( range(1, 3) as $index )
							<div class="Item__comment">
								<div class="row">
									<div class="col s2">
										<img src="http://materializecss.com/images/yuna.jpg" alt="" class="circle responsive-img">
									</div>
									<div class="col s10">
										<h6 class="Item__comment__name">Full Name</h6>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										</p>
									</div>
								</div>
							</div>
						@endforeach

						<div class="row">
							<div class="col s12">
								<form method="POST" action="#">
									<div class="input-field">
										<textarea id="textarea1" class="materialize-textarea"></textarea>
										<label for="textarea1">Write your comment</label>
									</div>
									<button type="submit" class="btn btn-waves-effect btn-waves-light">Submit comment</button>
								</form>
							</div>
						</div>
					
					</div>
				</div>
			</div>
		</div>
	</div>	
@endsection	

@section('footer_scripts')
	<script src="/js/ItemWithComments.js"></script>
@endsection