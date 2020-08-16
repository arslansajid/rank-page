import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import SearchInput from "../../components/Common/SearchInput";
import UserTile from "../../components/Search/UserTile";
import PostCard from "../../components/PostCard";
import FollowCategoryCard from "../../components/Profile/CategoryCard/FollowCategoryCard";
import { withRouter } from "react-router-dom";
import { searchResults } from "./action";

const Search = (props) => {
    const classes = useStyles();
    const { match, history } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSearchResults();
    }, [match.params.query])

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    const getSearchResults = () => {
        setIsLoading(true);
        const data = {
            search: match.params.query,
        }
        searchResults(data)
            .then((res) => {
                console.log("res");
                setResults(res.data.data ? res.data.data : null)
                setIsLoading(false);
            })
            .catch((err) =>
                console.log(err))
                setIsLoading(false);
    }

    console.log("searchResults", results)
    console.log("searchResults", props)

    return (
        <>
            {
                isLoading && (
                <LoadingSpinner
                    loading={isLoading}
                    text="Searching..."
                    size="large"
                />
                )
            }
            <SearchInput value={match.params.query} handleSearch={(value) => {
                // getSearchResults(value)
                history.push(`/search/${value}`)
            }} />
            <ButtonGroup className={classes.buttons} fullWidth size='large'>
                <Button onClick={() => handleTabChange(1)}>
                    <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>All</Typography>
                </Button>
                <Button onClick={() => handleTabChange(2)}>
                    <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Users</Typography>
                </Button>
                <Button onClick={() => handleTabChange(3)}>
                    <Typography className={activeTab === 3 ? classes.tabselected : classes.tab}>Experts</Typography>
                </Button>
                <Button onClick={() => handleTabChange(4)}>
                    <Typography className={activeTab === 4 ? classes.tabselected : classes.tab}>Lists</Typography>
                </Button>
                <Button onClick={() => handleTabChange(5)}>
                    <Typography className={activeTab === 5 ? classes.tabselected : classes.tab}>Categories</Typography>
                </Button>
            </ButtonGroup>

            {!!results ? (
                <>
                    {activeTab === 1 && (
                        <>
                        <Typography variant="h5" className="space-3">All Results</Typography>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Users</Typography>
                                {!!results.users && results.users.length >= 1 ?
                                results.users.slice(0,5).map((user, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile userId={user.id} name={user.name} userName={user.user_name} />
                                        </Grid>
                                    )
                                })
                                :
                                <Typography variant="h6" gutterBottom>No Users found...</Typography>
                            }
                            </Paper>

                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Experts</Typography>
                                {!!results.experts && results.experts.length > 1 ?
                                results.experts.map((expert, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile userId={expert.id} name={expert.name} userName={expert.user_name} />
                                        </Grid>
                                    )
                                })
                                :
                                <Typography variant="h6" gutterBottom>No Experts found...</Typography>
                            }
                            </Paper>

                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Categories</Typography>
                                <Grid container spacing={2}>
                                    {!!results.categories && results.categories.length > 1 ?
                                    results.categories.map((category, index) => {
                                        return (
                                            <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                                <FollowCategoryCard
                                                    category={category}
                                                />
                                            </Grid>
                                        )
                                    })
                                    :
                                    <Typography variant="h6" gutterBottom>No Categories found...</Typography>
                                }
                                </Grid>
                            </Paper>

                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Lists</Typography>
                                {!!results.lists && results.lists.length > 0 ?
                                results.lists.map((post, index) => {
                                    return (
                                        <Grid key={index}>
                                            <PostCard post={post} />
                                        </Grid>
                                    )
                                })
                                :
                                <Typography variant="h6" gutterBottom>No Lists found...</Typography>
                            }
                            </Paper>
                        </>
                    )}
                    {activeTab === 2 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Users</Typography>
                                {!!results.users && results.users.map((user, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile userId={user.id} name={user.name} userName={user.user_name} />
                                        </Grid>
                                    )
                                })}
                            </Paper>
                        </>
                    )}
                    {activeTab === 3 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Experts</Typography>
                                {!!results.experts && results.experts.map((expert, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile />
                                        </Grid>
                                    )
                                })}
                            </Paper>
                        </>
                    )}
                    {activeTab === 4 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Lists</Typography>
                                {!!results.lists && results.lists.map((post, index) => {
                                    return (
                                        <Grid key={index}>
                                            <PostCard post={post} />
                                        </Grid>
                                    )
                                })}
                            </Paper>
                        </>
                    )}
                    {activeTab === 5 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Categories</Typography>
                                <Grid container spacing={2}>
                                    {!!results.categories && results.categories.map((category, index) => {
                                        return (
                                            <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                                <FollowCategoryCard
                                                    category={category}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Paper>
                        </>
                    )}

                </>
            )
                :
                <Typography variant="h6" gutterBottom>No results found...</Typography>
            }

        </>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        margin: "8px 0",
        padding: "1em"
    },
    seperator: {
        // backgroundColor: 'rgba(38, 38, 38, 0.12)',
        width: '100%',
        height: 1,
        margin: "1em 0 1em"
    },
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
    buttons: {
        margin: theme.spacing(1, 0, 2, 0),
        fontSize: '1rem',
        borderRadius: '8px 0px 0px 8px',
    },
})
)

export default withRouter(Search);
