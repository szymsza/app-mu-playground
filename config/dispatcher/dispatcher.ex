defmodule Dispatcher do
  use Matcher
  define_accept_types [
    html: [ "text/html", "application/xhtml+html" ],
    json: [ "application/json", "application/vnd.api+json" ]
  ]

  @any %{}
  @json %{ accept: %{ json: true } }
  @html %{ accept: %{ html: true } }

  define_layers [ :static, :services, :fall_back, :not_found ]

  # CORS
  options "/*_" do
    conn
    |> Plug.Conn.put_resp_header( "access-control-allow-headers", "content-type,accept" )
    |> Plug.Conn.put_resp_header( "access-control-allow-methods", "*" )
    |> Plug.Conn.put_resp_header( "access-control-allow-origin", "*" )
    |> send_resp( 200, "{ \"message\": \"ok\" }" )
  end

  match "/books/*path", %{ layer: :services } do
    Proxy.forward conn, path, "http://books/books/"
  end

  match "/authors/*path", %{ layer: :services } do
    Proxy.forward conn, path, "http://books/authors/"
  end

  match "/people/*path", %{ layer: :services } do
    Proxy.forward conn, path, "http://resource/people/"
  end

  match "/friends/*path", %{ layer: :services } do
    Proxy.forward conn, path, "http://friends/"
  end

  get "/files/:id/download", %{ layer: :services } do
    Proxy.forward conn, [], "http://file/files/" <> id <> "/download"
  end

  post "/files/*path", %{ layer: :services } do
    Proxy.forward conn, path, "http://file/files/"
  end

  delete "/files/*path", %{ accept: [ :json ], layer: :services } do
    Proxy.forward conn, path, "http://file/files/"
  end

  match "/*_", %{ layer: :not_found } do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end
end
