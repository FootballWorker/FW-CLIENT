import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home/Home.js";
import Signup from "./user/Signup.js";
import NewUser from "./user/NewUser";
import Users from "./user/Users.js";
import Signin from "./auth/Signin.js";
import Profile from "./user/Profile.js";
import EditProfile from "./user/EditProfile.js";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./core/Dashboard";
import Menu from "./core/Menu";
import Department from "./department/Department";
import NewDepartment from "./department/NewDepartment";
import EditDepartment from "./department/EditDepartment";
import Job from "./job/Job";
import NewJob from "./job/NewJob";
import EditJob from "./job/EditJob";
import NewTeam from "./team/NewTeam";
import Team from "./team/Team";
import Teams from "./team/Teams";
import EditTeam from "./team/EditTeam";
import Player from "./player/Player";
import Players from "./player/Players";
import NewPlayer from "./player/NewPlayer";
import Match from "./match/Match";
import MatchesByTeam from "./match/MatchesByTeam";
import Matches from "./match/Matches";
import EditMatch from "./match/EditMatch";
import NewNews from "./news/NewNews";
import SingleNews from "./news/SingleNews";
import News from "./news/News";
import Landing from "./core/Landing/Landing.js";
import Post from "./post/signlePost/Post.js";
import NewPosition from "./position/NewPosition.js";
import EditPosition from "./position/EditPosition.js";
import EditNews from "./news/EditNews.js";
import NewPoll from "./poll/NewPoll.js";
import NewComment from "./comments/NewComment.js";
import Comment from "./comments/Comment.js";
import Poll from "./poll/Poll.js";
import EditPlayer from "./player/EditPlayer.js";
import NewMatch from "./match/NewMatch.js";
import Contact from "./core/Contact.js";
import NewPost from "./post/NewPost.js";
import UserComments from "./comments/UserComments.js";
import Outside from "./components/outside/Outside.js";
import Notifications from "./user/Notifications.js";
import Notification from "./user/Notification.js";
import Followers from "./user/Followers.js";
import Followings from "./user/Followings.js";
import Activate from "./user/Activate.js";
import Forgot from "./auth/Forgot.js";
import Reset from "./auth/Reset.js";


const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <PublicRoute path="/" component={Landing} exact />
        <PublicRoute path="/forgot/password" component={Forgot} exact />
        <PublicRoute path="/reset/password/:resetToken" component={Reset} exact />
        <PublicRoute path="/contact" component={Contact} exact />
        <PublicRoute path="/home" component={Home} exact />
        <PublicRoute path="/adminsignup" component={NewUser} exact />
        <PublicRoute path="/signup/to/:departmentId" component={Signup} exact />
        <PublicRoute path="/signin" component={Signin} exact />
        <PublicRoute path="/activate/:activationToken" component={Activate} exact />
        <PrivateRoute
          path="/users/edit/:userId"
          component={EditProfile}
          exact
        />
        <PrivateRoute path="/users/:userId" component={Profile} exact />
        <PrivateRoute path="/followers/:userId" component={Followers} exact />
        <PrivateRoute path="/followings/:userId" component={Followings} exact />
        <PrivateRoute path="/notifications/by/:userId" component={Notifications} exact />
        <PrivateRoute path="/notifications/:notificationId" component={Notification} exact />


        <AdminRoute path="/department/new" component={NewDepartment} exact />
        <PublicRoute
          path="/departments/:departmentId"
          component={Department}
          exact
        />
        <AdminRoute
          path="/department/edit/:departmentId"
          component={EditDepartment}
          exact
        />

        <AdminRoute path="/job/new/:departmentId" component={NewJob} exact />
        <PrivateRoute path="/jobs/:jobId" component={Job} exact />
        <AdminRoute path="/job/edit/:jobId" component={EditJob} exact />

        <PublicRoute path="/teams/:teamId" component={Team} exact />
        <AdminRoute path="/new/team" component={NewTeam} exact />
        <AdminRoute path="/edit/team/:teamId" component={EditTeam} exact />

        <PublicRoute path="/matches" component={Matches} exact />
        <PublicRoute path="/matches/:matchId" component={Match} exact />
        <PublicRoute
          path="/matches/by/:teamId"
          component={MatchesByTeam}
          exact
        />
        <PublicRoute path="/match/new/:teamId" component={NewMatch} exact />
        <PrivateRoute path="/match/edit/:matchId" component={EditMatch} />

        <PrivateRoute path="/all/news" component={News} exact />
        <PrivateRoute path="/news/:newsId" component={SingleNews} exact />
        <PrivateRoute path="/new/news" component={NewNews} exact />
        <PrivateRoute path="/news/edit/:newsId" component={EditNews} exact />
        <PrivateRoute path="/post/new/:newsId" component={NewPost} exact />

        <PublicRoute path="/players/:playerId" component={Player} exact />
        <PublicRoute path="/new/player/:teamId" component={NewPlayer} exact />
        <PublicRoute
          path="/player/edit/:playerId"
          component={EditPlayer}
          exact
        />

        <PublicRoute path="/posts/:postId" component={Post} exact />
        <PrivateRoute path="/posting/:teamId/new" component={NewPost} exact />
        <PrivateRoute path="/new/:playerId/post" component={NewPost} exact />
        <PrivateRoute path="/newpost/:matchId" component={NewPost} exact />

        <PrivateRoute path="/comments/:commentId" component={Comment} exact />
        <PrivateRoute path="/comments/by/:userId" component={UserComments} exact />
        <PrivateRoute
          path="/comment/new/:postId"
          component={NewComment}
          exact
        />

        <PrivateRoute path="/polls/:pollId" component={Poll} exact />
        <PrivateRoute path="/new/poll/:teamId" component={NewPoll} exact />
        <AdminRoute path="/users" component={Users} exact />
        <AdminRoute
          path="/position/edit/:positionId"
          component={EditPosition}
        />
        <AdminRoute path="/players" component={Players} exact />
        <AdminRoute path="/teams" component={Teams} exact />
        <AdminRoute path="/new/position" component={NewPosition} />
        <AdminRoute path="/dashboard" component={Dashboard} />
        <Route component={Outside} />
      </Switch>
    </div>
  );
};

export default MainRouter;
