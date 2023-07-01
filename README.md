# redis_cache_demo
Demo of caching api responses with redis


<h1>Caching with redis</h1>
<p>Caching is a very good way to optimize performance in the backend and can even lower costs due to less requests needing to be made to an API.</p>

<p>In this demo I use a dummy api to fetch a product, and then store that product in the redis cache for later use, this way when a request is made again regarding the same product it is pulled from the cache!</p>
