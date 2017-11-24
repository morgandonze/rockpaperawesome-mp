defmodule RockpaperawesomeWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "queue", Rockpaperawesome.QueueChannel
  channel "invite", Rockpaperawesome.InviteChannel
  channel "invite:*", Rockpaperawesome.InviteChannel
  channel "game:*", Rockpaperawesome.GameChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.

  # TODO: AUTHENTICATE USER
  def connect(%{"user_name" => user_name}, socket) do
    new_socket =
      socket
      |> assign(:user_id, Ecto.UUID.generate)
      |> assign(:user_name, user_name)
    {:ok, new_socket}
  end

  # def connect(_params, socket) do
  #   {:ok, socket}
  # end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     RockpaperawesomeWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
