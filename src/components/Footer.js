import React , {Component} from 'react';

class Footer extends React.Component{
    render(){
        return(
            <div>
                <div class="footer">
                        <div class="container">
                            <div class="row">
                                <div class="footer-col-1">
                                    <img src="logo.jpeg"/>
                                    <p>Our purpose is to make the donations flexible to access to many.</p>
                                </div>
                                <div class="footer-col-2">
                                    <h3>Follow us</h3>
                                    <ul>
                                        <li>Facebook</li>
                                        <li>Twitter</li>
                                        <li>Instagram</li>
                                        <li>Youtube</li>
                                    </ul>
                                </div>
                            </div>
                            <p class="copyright">Copyright 2021 - Giveaway</p>
                            </div>
                    </div>
            </div>
        )
    }
}
export default Footer