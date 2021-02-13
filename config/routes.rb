Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'post#create'
  get 'posts/:id', to: 'posts#checked'
end
