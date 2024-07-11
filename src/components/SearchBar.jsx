import '../App.css'

const SearchBar = () => {
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
				integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
				crossorigin="anonymous"
				referrerpolicy="no-referrer"
			/>

			<header>
				<div className="search-box" style={{ width: '400px' }}>
					<form action="">
						<input type="text" name="search" id="srch" placeholder="Buscar" />
						<button type="submit">
							<i class="fa fa-search"></i>
						</button>
					</form>
				</div>
			</header>
		</div>
	)
}
export default SearchBar
